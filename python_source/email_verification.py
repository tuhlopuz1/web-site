import os.path
import base64
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# Если измените эти области, удалите файл token.json.

def send_verification_code(code, email):
    SCOPES = ['https://www.googleapis.com/auth/gmail.send']
    creds = None
    # Файл token.json хранит токен доступа пользователя.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # Если нет (действительных) учетных данных, позвольте пользователю войти в систему.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Сохраните учетные данные для следующего запуска
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    service = build('gmail', 'v1', credentials=creds)

    # Создание сообщения
    message = MIMEText(str(code))
    message['to'] = email
    message['subject'] = 'Подтверждение электронной почты'
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    # Отправка сообщения
    service.users().messages().send(userId='me', body={'raw': raw_message}).execute()
    print('Письмо отправлено!')

