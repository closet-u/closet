export class ClosetApiService {
  private cors = "https://cors-anywhere.herokuapp.com/";
  private api_url = "http://127.0.0.1:5000";
  private flask_login = `${this.api_url}/login`;
  private flask_register = `${this.api_url}/register`;
  private flask_send_image = `${this.api_url}/upload`;

  get_user_info(username: string, password: string) {
    const response = fetch(this.flask_login, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => response)
      .catch((error) => {
        alert("FAILED " + error);
      });
    return response;
  }

  send_register_info(username: string, password: string) {
    console.log(
      JSON.stringify({
        username: username,
        password: password,
      })
    );
    const response = fetch(this.flask_register, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("It no work " + error);
      })
      .then((response) => {
        return response.status;
      });
    return response;
  }

  send_images(img_src: string, type: string, color: string) {
    /* console.log(
      JSON.stringify({
        username: username,
        password: password,
      })
    ); */
    const response = fetch(this.flask_send_image, {
      method: "POST",
      body: JSON.stringify({
        bucket_name: "User 1",
        obj_key: "user-1-item",
        data: JSON.stringify({
          img_src: img_src,
          type: type,
          color: color,
        }),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("It no work " + error);
      })
      .then((response) => {
        return response.status;
      });
    return response;
  }

  getUserImages(username: string): Promise<string[]> {
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
    let images = [
      "https://m.media-amazon.com/images/M/MV5BZTdlNzhmYmYtOGE3Zi00NTViLWFhM2UtYWQ4NjMzNGRiYTU3XkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_UY268_CR11,0,182,268_AL_.jpg",
      "/Users/claudiasychev/closet-u/front-end/src/static/images/SAMPLE3.jpg",
      "../static/images/hanger.jpg",
      "./SAMPLE2.jpg",
      "../static/images/SAMPLE2.jpg",
      "../static/images/SAMPLE2.jpg",
      "../static/images/SAMPLE2.jpg",
    ];
    return new Promise((resolve) => resolve(images));
  }
}

export default ClosetApiService;
