import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

html = open('index.html', 'r', encoding='utf-8').read()

print("--- DOM ID COUNT CHECK ---")
ids_to_check = [
    'btn-request-notif',
    'btn-request-notif-text',
    'notif-status-badge',
    'exportExcelModalBtn',
    'importExcelModalBtn',
    'downloadExcelTemplateModalBtn',
    'update-modal',
    'modal-form',
    'settingsModal',
    'settings-form',
    'nav-btn-tasks',
    'nav-btn-time',
    'nav-btn-habits',
    'nav-btn-notes',
    'module-tasks-view',
    'module-time-view',
    'module-habits-view',
    'module-notes-view',
    'habit-modal',
    'habit-form',
    'note-modal',
    'note-form'
]

for item_id in ids_to_check:
    count = len(re.findall(rf'id=["\']{re.escape(item_id)}["\']', html))
    print(f"ID '{item_id}': {count} occurrence(s)")
    if count != 1:
        print(f"  WARNING: ID '{item_id}' count is {count}, expected 1!")

print("--- HTML VALIDATION DONE ---")
