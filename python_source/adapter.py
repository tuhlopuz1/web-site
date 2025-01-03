from supabase import create_client, Client



class DBAdapter:
    def __init__(self, url, key):
        self.Client = create_client(url, key)

    def get_user_by_email(self, email):
        user_data = self.Client.table('users').select("*").eq('email', email).execute()
        return user_data.data
    def get_user_by_login(self, login):
        user_data = self.Client.table('users').select("*").eq('login', login).execute()
        return user_data.data
    def insert_new_user(self, email, login, password):
        new_user = {
            'email': email,
            'login': login,
            'password': password
        }
        try:
            self.Client.table('users').insert(new_user).execute()
        except Exception as e:
            print(e)
        print(f'Success fully created user with {new_user}')

