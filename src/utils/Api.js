const API_KEY = '';

export default class Api {
  static getPostList() {
    let url = 'https://jsonplaceholder.typicode.com/posts';

    return fetch(url)
    .then(response => response.json())
    .then(json     => {
      const images = [
        "https://images.unsplash.com/photo-1441311956160-78a471e0638d?dpr=2&auto=format&fit=crop&w=500&h=500&q=80&cs=tinysrgb&crop=",
        "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?dpr=2&auto=format&fit=crop&w=200&h=200&q=80&cs=tinysrgb&crop=",
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?dpr=2&auto=format&fit=crop&w=200&h=200&q=80&cs=tinysrgb&crop=",
        "https://images.unsplash.com/photo-1481487196290-c152efe083f5?dpr=2&auto=format&fit=crop&w=200&h=200&q=80&cs=tinysrgb&crop="
      ];
      let count = 0;

      for (var i in json) {
        count = count > 3 ? 0 : count;
        json[i]['imageUrl'] = images[count];
        json[i]['speaker'] = 'John Machahuay';
        json[i]['comments'] = 230;
        json[i]['likes'] = 20;
        count++;
      }
      return json;
    })
    .catch(error   => console.warn(error));
  }
}
