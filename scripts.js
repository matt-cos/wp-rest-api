var request = new XMLHttpRequest();

request.open('GET', 'https://bmwmovement.org/wp-json/wp/v2/posts?_embed', true);

request.onload = function(){
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		data.forEach(post => {
			const singlePost = document.createElement('div');
			singlePost.setAttribute('class', 'row post post-id-' + post.id);
			container.appendChild(singlePost);

			const column33 = document.createElement('div');
			column33.setAttribute('class', 'column column-50');
			singlePost.appendChild(column33);

			const postLink = 'https://bmwmovement.org/wp-json/wp/v2/posts/' + post.id;

			const link = document.createElement('a');
			link.setAttribute('href', postLink);
			link.setAttribute('class', 'title column');
			if (post._embedded['wp:featuredmedia']['0'].source_url) {
				link.setAttribute('data-bg-image', post._embedded['wp:featuredmedia']['0'].source_url);
			} else {
				link.setAttribute('data-bg-image', post._embedded['wp:featuredmedia']['0'].source_url);
			}
			link.textContent = post.title.rendered;
			column33.appendChild(link);
		});
	} else {
		console.log('error');
	}

}

function transferComplete(){
	console.log("Successful AJAX call");

	const links = document.getElementsByTagName('a');
	const body = document.getElementsByClassName('bg-img')[0];

	for (var i = links.length - 1; i >= 0; i--) {
		links[i].addEventListener("mouseover", function(){
			console.log(this.attributes[2].value);
			let bgImg = this.attributes[2].value;
			body.setAttribute('style','background-image: url(' + bgImg + ');');
		});
	}


	// document.getElementById("demo").onmouseover = function() {mouseOver()};
	// document.getElementById("demo").onmouseout = function() {mouseOut()};
}

request.addEventListener("load", transferComplete);

request.send();

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);
