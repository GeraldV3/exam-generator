import re

def parse_aiken(content: str):
    questions = []
    blocks = content.strip().split("\n\n")  # Each question block is separated by 1 blank line

    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) < 3:
            raise ValueError("Each question must include question text, at least two choices, and an ANSWER.")

        question_text = lines[0].strip()
        choices = []
        correct = None

        for line in lines[1:]:
            line = line.strip()
            if re.match(r'^ANSWER:\s+[A-Z]$', line):
                correct = line.split(":")[1].strip()
            elif re.match(r'^[A-Z]\.\s+', line):
                label, text = line.split(".", 1)
                choices.append((label.strip(), text.strip()))
            else:
                raise ValueError(f"Malformed line: {line}")

        if not correct or len(choices) < 2:
            raise ValueError("Missing correct answer or not enough choices.")

        questions.append({
            "text": question_text,
            "choices": choices,
            "correct": correct
        })

    return questions
