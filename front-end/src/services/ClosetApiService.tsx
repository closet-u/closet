
export class ClosetApiService {
  private cors = "https://cors-anywhere.herokuapp.com/"
  private api_url = "http://127.0.0.1:5000";
  private flask_login = `${this.api_url}/login`;
  private flask_register = `${this.api_url}/register`;
  private flask_images = `${this.api_url}/images`;

  get_user_info(username: string, password: string) {
    const response = fetch(this.flask_login, {
      method: 'POST',
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: {
        'Content-Type': 'application/json',
        "x-requested-with": "XMLHttpRequest",
      }
    })
      .then(response => response)
      .catch(error => {
        alert("FAILED " + error)
      });
    return response;
  }

  send_register_info(username: string, password: string) {
    console.log(JSON.stringify({
      "username": username,
      "password": password
    }))
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
    return response;
  }

  get_user_images(username: string) {
    // const response = fetch(`${this.flask_images}/?username=${username}`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // }
    // ).then(response => response.json())
    //   .catch(error => {
    //     alert("It no work " + error)
    //   }).then(response => {
    //     return response.status;
    //   });
    let images = ['../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg', '../../../images/SAMPLE2.jpg']
    return new Promise((resolve) => resolve(images));
  }
}

export default ClosetApiService;
