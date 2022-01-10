import { useEffect, useState } from 'react';
import { Comment } from '../models/Comment.model';
import api, { apiReturnFile } from '../service/api';
import './styles.css';

function Home() {
    const [listComment, setComments] = useState<Comment[]>([]);
    const [inputComment, setInputComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getComments();
    }, [])

    const handleAudio = async (e: any) => {
        setLoading(true);
        const audio = new Audio(`${apiReturnFile}/pronunciation/${e.target.id}`);
        let playPromise = audio.play();

        playPromise.then(() => {
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            alert(err)
        });
    }

    const handleChangeInput = (e: any) => {
        setInputComment(e.target.value);
    }

    const getComments = async () => {
        setLoading(true);
        
        await api.get('/comments').then((resp) => {
            setLoading(false);
            setComments(resp.data);
        }).catch((err) => {
            setLoading(false);
            alert(err.message);
        });
    }

    const postComment = async () => {
        if (inputComment === '') return;

        setLoading(true);
        const comment: Comment = { description: inputComment };

        await api.post('/comments', comment).then(() => {
            getComments();
            setLoading(false);
            setInputComment('');
        }).catch(() => {
            setLoading(false);
        });
    }

    return (
        <>
            {loading ? <div className={'loading-container'}>
                <span className={'span-loading'}>Carregando ...</span>
            </div> : null}
            
            <div className={'app-container'}>
                <div className={'left-container'}>
                    <h3>Comentario</h3>
                    <textarea value={inputComment} onChange={handleChangeInput} ></textarea>
                    <button className={'button-post'} type="button" onClick={postComment}>Cadastrar</button>
                </div>
                <hr />
                <div className={'right-container'}>
                    <h3>Comentários</h3>
                    {listComment.length > 0 && listComment.map((comment: Comment) => (
                        <div key={comment.id} className={'item-conatiner'}>
                            <p className={'text-comment'}>{comment.description}</p>
                            <div className={'button-container'}>
                                <button className={'button-audio'} type="button"
                                    onClick={handleAudio} id={(comment.id).toString()}>
                                    Ouvir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home