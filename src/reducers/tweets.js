import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../constants/tweets"

const tweets = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_TWEETS:
			return {
				...state,
				...action.tweets,
			}
		case TOGGLE_TWEET:
			return {
				...state,
				[action.id]: {
					...state[action.id],
					likes :
						action.hasLiked === true
							? state[action.id].likes.filter(
									(uid) => uid !== action.authUser,
								)
							: state[action.id].likes.concat([
									action.authUser,
								]),
				},
			}
		case ADD_TWEET:
			const { tweet } = action
			let replyingTo = {}

			if (tweet.replyingTo !== null) {
				replyingTo = {
					[tweet.replyingTo]: {
						...state[tweet.replyingTo],
						replies : state[tweet.replyingTo].replies.concat([
							tweet.id,
						]),
					},
				}
			} else {
			}

			return {
				...state,
				[action.tweet.id]: action.tweet,
				...replyingTo,
			}

		default:
			return state
	}
}

export default tweets
