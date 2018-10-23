var wpOutput;

var request = new XMLHttpRequest();

request.addEventListener("progress", updateProgress);
request.addEventListener("load", transferComplete);

request.open('GET', 'https://bmwmovement.org/wp-json/wp/v2/posts?_embed', true);

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

	document.getElementById('loader').style.display = 'none';
}

function updateProgress (oEvent) {
	if (oEvent.lengthComputable) {
		var percentComplete = oEvent.loaded / oEvent.total * 100;
		console.log(percentComplete);
	} else {
		console.log('// Unable to compute progress information since the total size is unknown. belive it has to do with the "file://"');
	}
}

request.onload = function(){
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		data.forEach(post => {
			wpOutput = '<div class="row post postid-' + post.id + '"><div class="column column-50 title__wrapper"><a href="file:///Users/mattcos/Development/wp-rest-api/portfolio-item/' + post.slug + '" class="title">' + post.title.rendered + '</a></div></div>';

			app4.todos.push({ text: wpOutput });

			// https://router.vuejs.org/guide/essentials/dynamic-matching.html
		});
	} else {
		console.log('error');
	}

}

var app4 = new Vue({
	el: '#vue-app',
	data: {
		todos: [
			// { text: 'Learn JavaScript' },
			// { text: 'Learn Vue' },
			// { text: 'Build something awesome' }
		]
	}
});

request.send();

// const app = document.getElementById('root');

// const container = document.createElement('div');
// container.setAttribute('class', 'container');

// app.appendChild(container);
