import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql } from 'react-apollo';



class LyricList extends Component{
	onLike(id, likes){
		this.props.mutate({ 

			variables: {id},
			optimisticResponse: {
				__typename: 'Mutation', //optimistic response for likes count to make it seem real time.
				likeLyric: {
					id: id,
					__typename: 'LyricType',
					likes: likes + 1
				}
			}


			 });
	}
	
	renderLyrics(){
		return this.props.lyrics.map(({id, content, likes}) => {
			return (
				
				<li key={id} className="collection-item">
					{content}
					<div className="vote-box">

					<i 
					className="material-icons"
					onClick={() => this.onLike(id, likes)}


					>thumbs_up
					</i>

					{likes}

					</div>
				</li>
				

				);
		});
	}


	render(){
		return(
			<ul>
				<li>

				{this.renderLyrics()}

				</li>

			</ul>




			);
	}
}

const mutation = gql`
	mutation LikeLyrics($id : ID){
  likeLyric(id : $id){
    id
    likes
  }
}


`;

export default graphql(mutation)(LyricList);