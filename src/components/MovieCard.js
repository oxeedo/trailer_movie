import React from 'react'
import { Modal, ModalBody, ModalHeader, } from "react-bootstrap";
import { useState } from 'react';

const MovieCard = ({ movie, selectMovie }) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return (
        <div className='movie-card' onClick={() => selectMovie(movie)}>
            <h5 className='movie-title'>{movie.title}</h5>
            {movie.poster_path ? <img className='movie-cover' src={`${IMAGE_PATH}${movie.poster_path}`} alt='' /> :
                <div className='movie-placeholder'>No Image Found</div>}
            <br></br>
            <button type="button" className="btn btn-sm btn-dark" onClick={handleShow}>View More</button>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <Modal.Title>{movie.title}</Modal.Title>
                </ModalHeader>
                <ModalBody>

                    <img className="card-img-top" src={IMAGE_PATH + movie.poster_path} alt="" />
                    <h3>{movie.title}</h3>
                    <h4>ImBD:{movie.vote_average}</h4>
                    <h5>Release Date:{movie.release_date}</h5>
                    <br></br>
                    <h6>Overview</h6>
                    <p>{movie.overview}</p>
                </ModalBody>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default MovieCard;