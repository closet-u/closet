
export class ClosetApiService {
  private api_url = "http://localhost:3000";
  private flask_login = `${this.api_url}/login`;
  private flask_register = `${this.api_url}/register`

  get_user_info(username: string, password: string) {
    const response = fetch(this.flask_login, {
      method: 'GET',
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response)
      .catch(error => {
        alert("FAILED " + error)
      });
    return response;
  }

  send_register_info(username: string, password: string) {
    const response = fetch(this.flask_register, {
      method: 'POST',
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: { 'Content-Type': 'application/json' }
    }
    ).then(response => response.json())
      .catch(error => {
        alert("It no work " + error)
      }).then(response => {
        return response.status;
      });
  }
}

export default ClosetApiService;
