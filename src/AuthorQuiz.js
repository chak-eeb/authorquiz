import React from 'react';
import propTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css';

function Hero() {
	return (
		<div className='row'>
			<div className='jumbotron col-10 offset-1'>
				<h1>Author Quiz</h1>
				<p>Select the book written by the author in the picture</p>
			</div>
		</div>
	);
}

function Book({ title, onClick }) {
	return (
		<div
			className='answer'
			onClick={() => {
				onClick(title);
			}}
		>
			<h4>{title}</h4>
		</div>
	);
}

function Turn({ author, books, highlight, onAnswerSelected }) {
	function highlightToBackgroundColor(highlight) {
		const mapping = {
			none: '',
			correct: 'green',
			wrong: 'red'
		};
		return mapping[highlight];
	}

	return (
		<div
			className=' turn'
			style={{ backgroundColor: highlightToBackgroundColor(highlight) }}
		>
			<div className=''>
				<img src={author.imageUrl} className='authoimage' alt='author' />
			</div>
			<div className='data'>
				{books.map(title => (
					<Book title={title} key={title} onClick={onAnswerSelected} />
				))}
			</div>
		</div>
	);
}

Turn.propTypes = {
	author: propTypes.shape({
		name: propTypes.string.isRequired,
		imageUrl: propTypes.string.isRequired,
		imageSource: propTypes.string.isRequired,
		books: propTypes.arrayOf(propTypes.string).isRequired
	}),
	books: propTypes.arrayOf(propTypes.string).isRequired,
	onAnswerSelected: propTypes.func.isRequired,
	highlight: propTypes.string.isRequired
};

function Continue() {
	return <div></div>;
}

function Footer() {
	return (
		<div id='footer' className='row'>
			<div className='col-12'>
				<p className='text-muted credit'>
					All images are from{' '}
					<a href='http://commons.wikimedia.org/wiki/Main_Page'>
						Wikimedia Commons
					</a>{' '}
					and are in the public domain.
				</p>
			</div>
		</div>
	);
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected }) {
	return (
		<div className='container-fluid'>
			<Hero />
			<Turn
				{...turnData}
				highlight={highlight}
				onAnswerSelected={onAnswerSelected}
			/>
			<Continue />
			<Footer />
		</div>
	);
}

export default AuthorQuiz;
