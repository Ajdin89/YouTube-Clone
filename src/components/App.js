import React from 'react';
import SearchBar from './SearchBar';
import Youtube from '../api/Youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyBNO8TJrVd86GrgWuwZzotZ4MXe4KtQy-g';

class App extends React.Component {
	state = { videos: [], selectedVideo: null };

	componentDidMount() {
		this.onTermSubmit('youtube home');
	}

	onTermSubmit = async (term) => {
		const response = await Youtube.get('/search', {
			params: {
				part: 'snippet',
				maxResults: 5,
				key: KEY,
				q: term,
			},
		});
		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0],
		});
	};

	onVideoSelect = (video) => {
		this.setState({
			selectedVideo: video,
		});
	};

	render() {
		return (
			<div className='ui container' style={{marginTop: '20px'}}>
				<SearchBar onFormSubmit={this.onTermSubmit} />
				<div className='ui grid'>
					<div className='ui row'>
						<div className='eleven wide column'>
							<VideoDetail video={this.state.selectedVideo} />
						</div>
						<div className='five wide column'>
							<VideoList
								videos={this.state.videos}
								onVideoSelect={this.onVideoSelect}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
