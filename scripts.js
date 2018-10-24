var wpOutput;

var request = new XMLHttpRequest();

request.addEventListener("progress", updateProgress);

request.open('GET', 'https://bmwmovement.org/wp-json/wp/v2/posts?_embed', true);

function updateProgress (oEvent) {
	if (oEvent.lengthComputable) {
		var percentComplete = oEvent.loaded / oEvent.total * 100;
		console.log(percentComplete);
	} else {
		console.log('// Unable to compute progress information since the total size is unknown. belive it has to do with the "file://"');
	}
}

function transferComplete(){
	console.log("Successful AJAX call");

	const links = document.getElementsByClassName('title');
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

request.onload = function(){
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		data.forEach(post => {
			wpOutput = '<div class="row post postid-' + post.id + '"><div class="column column-33 title__wrapper"><a href="file:///Users/mattcos/Development/wp-rest-api/index.html#/portfolio/' + post.slug + '" class="title" data-bg-img="' + post._embedded['wp:featuredmedia']['0'].source_url + '">' + post.title.rendered + '</a></div></div>';

			app.todos.push({ text: wpOutput });

			// https://router.vuejs.org/guide/essentials/dynamic-matching.html
		});
	} else {
		console.log('error');
	}

}

request.send();

request.addEventListener("load", transferComplete);

// Define a new component called button-counter
Vue.component('button-counter', {
	data: function () {
		return {
			count: 0
		}
	},
	template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

Vue.component('post-list', {
	template: '<span v-for="todo in todos" v-html="todo.text"></span>'
})

Vue.component('blog-post', {
	props: ['title'],
	template: '<h3>{{ title }}</h3>'
})


// https://medium.com/frontend-fun/vuejs-routing-with-vue-router-1548f94c0575

// useful error message:
// [Vue warn]: Error compiling template:
// <h3>Home Content</h3><br><button-counter></button-counter>
// - Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.



// const Home = { template: '<h3>Home Content</h3>'};
// const Home = { template: '<h3>Home Content</h3><br><button-counter></button-counter>'};
const Home = { template: '<button-counter></button-counter>'};
// const Home = { template: '<post-list></post-list>'};
// const Home = { template: '<blog-post v-for="todo in todos" v-bind:key="todo.id" v-bind:title="todo.text"></blog-post>'};
const Foo = { template: '<h3>Foo</h3>'};
const About = { template: '<h3>About</h3>'};
const User = {
	props: ['name'],
	template: `<h3>User: {{ name }}</h3>`
};
const Portfolio = {
	props: ['name'],
	template: `<h3>Portfolio Item: {{ name }}</h3>`
};

const routes = [
	{ path: '/', component: Home },
	{ path: '/foo', component: Foo },
	{ path: '/bar', redirect: '/' },
	{ path: '/about', component: About },
	{ path: '/user/:name', component: User, props: true },
	{ path: '/portfolio/:name', component: Portfolio, props: true },
];

const router = new VueRouter({
	// mode: 'history',
	routes
})

const app = new Vue({
	data: {
		todos: [
			// { text: 'Learn JavaScript' },
			// { text: 'Learn Vue' },
			// { text: 'Build something awesome' }
		],
		posts: [
			{ id: 1, title: 'My journey with Vue' },
			{ id: 2, title: 'Blogging with Vue' },
			{ id: 3, title: 'Why Vue is so fun' }
		]
	},
	router
}).$mount('#app');
