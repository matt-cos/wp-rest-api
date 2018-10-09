var request = new XMLHttpRequest();

request.open('GET', 'https://bmwmovement.org/wp-json/wp/v2/posts?_embed', true);

request.onload = function(){
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		data.forEach(post => {
			const singlePost = document.createElement('div');
			singlePost.setAttribute('class', 'post post-id-' + post.id);
			container.appendChild(singlePost);

			// const postLink = post.link;
			const postLink = 'https://bmwmovement.org/wp-json/wp/v2/posts/' + post.id;

			const link = document.createElement('a');
			link.setAttribute('href', postLink);
			link.setAttribute('class', 'title');
			link.setAttribute('post-id', post.id);
			link.textContent = post.title.rendered;
			singlePost.appendChild(link);

			console.log(post);

			if (post._embedded['wp:featuredmedia']['0'].source_url) {
			// if (post.id) {
				const imgLink = document.createElement('img');
				imgLink.setAttribute('src', post._embedded['wp:featuredmedia']['0'].source_url);
				singlePost.appendChild(imgLink);
			}

		});
	} else {
		console.log('error');
	}

}

request.send();

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);
