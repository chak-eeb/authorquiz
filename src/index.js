import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import { render } from '@testing-library/react';

const authors = [
	{
		name: 'Mark Twain',
		imageUrl: 'images/mtwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: [
			'the advtres of Huckelberry finn',
			'life on the mississipi',
			'roughing it'
		]
	},
	{
		name: 'Richard Yates',
		imageUrl: 'images/yates.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Tao lin', 'Disturbing the peace']
	},
	{
		name: 'Stephen King',
		imageUrl: 'images/stephen-king.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['pet cemetary', 'the outsider']
	}
];

function getTurnData(authors) {
	const allBooks = authors.reduce(function(p, c, i) {
		return p.concat(c.books);
	}, []);
	const fourRandomBooks = shuffle(allBooks).slice(0, 4);
	const answer = sample(fourRandomBooks);
	return {
		books: fourRandomBooks,
		author: authors.find(author => author.books.some(title => title === answer))
	};
}

function resetState() {
	return {
		turnData: getTurnData(authors),
		highlight: ''
	};
}

let state = resetState();

function onAnswerSelected(answer) {
	const isCorrect = state.turnData.author.books.some(book => book === answer);
	state.highlight = isCorrect ? 'correct' : 'wrong';
	render();
}

function App() {
	return (
		<AuthorQuiz
			{...state}
			onAnswerSelected={onAnswerSelected}
			onContinue={() => {
				state = resetState();
				render();
			}}
		/>
	);
}

const AuthorWrapper = withRouter(
	({ history }) => {
		return (
			<AddAuthorForm
				onAddAuthor={author => {
					authors.push(author);
					history.push('/');
				}}
			/>
		);
	},

	function render() {
		ReactDOM.render(
			<BrowserRouter>
				<>
					<Route exact path='/' component={App} />
					<Route exact path='/add' component={AuthorWrapper} />
				</>
			</BrowserRouter>,
			document.getElementById('root')
		);
	}
);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
