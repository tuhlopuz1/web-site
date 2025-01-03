from supabase import create_client, Client
import os
url = "https://txrvpoufhekskfpnyrhn.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cnZwb3VmaGVrc2tmcG55cmhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQwNjQ5MSwiZXhwIjoyMDUwOTgyNDkxfQ.HV9JxDADslVOH1ZJNDYR-OrQdhv-5IJKXlJ1MyEuZYU"


class QuizAdapter:
    def __init__(self, url, key):
        self.Client = create_client(url, key)

    def upload_image(self, file, file_name):
        
        response = self.Client.storage.from_('images').upload('./' + file_name, file)
        return response

    def get_image(self, name):
        url = 'https://txrvpoufhekskfpnyrhn.supabase.co/storage/v1/object/public/images/'
        return url + name

    def upload_quiz(self, data):

        new_quiz = {
            'name':data['title'],
            'description':data['description'],
            'questions':data['questions'],
            'creator':data['creator']
        }


        self.Client.table('quizzes').insert(new_quiz).execute()

