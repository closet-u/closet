import { ImageMetadata } from "../models/ImageMetadata";

export class ClosetApiService {
  private cors = "https://cors-anywhere.herokuapp.com/";
  private api_url = "http://127.0.0.1:5000";
  private flask_login = `${this.api_url}/login`;
  private flask_register = `${this.api_url}/register`;
  private flask_send_image = `${this.api_url}/upload`;
  private flask_retrieve_images = `${this.api_url}/retrieve`;
  private flask_retrieve_sorted_images = `${this.api_url}/sort`;

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

  fake_it() {}

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

  sendImages(img_src: string, type: string, color: string) {
    console.log({ img_src });
    const response = fetch(this.flask_send_image, {
      method: "POST",
      body: img_src,
      headers: {
        "Content-Type": "image/*",
        type: type,
        color: color,
        bucket_name: "test-account-images",
        obj_key: "user-1-item",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response.status;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  getUserImages(username: string): Promise<ImageMetadata[]> {
    const response = fetch(`${this.flask_retrieve_images}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Accept: "image/*" },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("call succeeded, got this:");
        console.log(response);
        return response;
      })
      .catch((error) => {
        return new Promise((resolve) => resolve([]));
      });
    return response;
    // let images = [
    //   "https://m.media-amazon.com/images/M/MV5BZTdlNzhmYmYtOGE3Zi00NTViLWFhM2UtYWQ4NjMzNGRiYTU3XkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_UY268_CR11,0,182,268_AL_.jpg",
    //   "/Users/claudiasychev/closet-u/front-end/src/static/images/SAMPLE3.jpg",
    //   "../static/images/hanger.jpg",
    //   "./SAMPLE2.jpg",
    //   "../static/images/SAMPLE2.jpg",
    //   "../static/images/SAMPLE2.jpg",
    //   "../static/images/SAMPLE2.jpg",
    // ];
    // return new Promise((resolve) => resolve(images));
  }

  getImagesWithSelectedTags(
    clothingType: string,
    color: string
  ): Promise<string[]> {
    const response = fetch(`${this.flask_retrieve_sorted_images}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Accept: "image/*" },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("call succeeded, got this:");
        console.log(response);
        return response;
      })
      .catch((error) => {
        return new Promise((resolve) => resolve([]));
      });
    return response;
  }
}

export default ClosetApiService;
