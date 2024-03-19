import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from './Post.module.css';
import { useState } from "react";
export function Post({author, publishedAt, content}) {
	const [comments, setComments] = useState(['Muito bom Devon, parabéns!! 👏👏']);
	const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
		locale: ptBR,
	});
	const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true
	});
	const [newCommentText, setNewCommentText] = useState('');
	function handleCreateNewComment() {
		event.preventDefault();
		setComments([...comments,newCommentText]);
        setNewCommentText('');
	}
	function handleNewCommentChange(){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }
    function handleNewCommentInvalid(){
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }
	function deleteComment(commentToDelete){
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment != commentToDelete;
        })
        setComments(commentsWithoutDeleteOne);
    }
	const isNewCommentEmpty = newCommentText.length==0;
	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={author.avatarUrl}/>
					<div className={styles.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>
				<time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>Publicado {publishedDateRelativeToNow}</time>
			</header>
			<div className={styles.content}>
				{content.map(item => {
					if (item.type === 'paragraph') {
						return <p>{item.content}</p>;
					} else if (item.type === 'link') {
						return <p><a href="#">{item.content}</a></p>;
					}
				})}
			</div>
			<form onSubmit={handleCreateNewComment} className={styles.commentForm}>
				<strong>Deixe seu feedback</strong>
				<textarea
					 name="comment" placeholder='Deixe um comentário' onChange={handleNewCommentChange} value={newCommentText} onInvalid={handleNewCommentInvalid} required
				/>
				<footer>
					<button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
				</footer>
			</form>
			<div className={styles.commentList}>
				{comments.map(
                    comment => {
                        return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>;
                    }
                )}
			</div>
		</article>
	)
}