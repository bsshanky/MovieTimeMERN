import React, { useState, useEffect } from 'react';
import MovieDataService from "../services/movies";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();
    let location = useLocation();

    let editing = false;
    let initialReviewState = "";

    const currentReview = location.state?.currentReview;

    useEffect(() => {
        if (currentReview) {
            // Set the initial review state when editing
            
            setReview(currentReview);
            editing = true;
            console.log(currentReview)
            console.log(editing)
        }
    }, [currentReview]);

    // InitialReviewState will have a different value
    // if we're editing an existing review

    const [review, setReview] = useState(initialReviewState);

    function onChangeReview(e) {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = { 
            review: review, 
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id // get movie id from url
        }

        if (currentReview) {
            // TODO: Handle case where an existing review is being updated
            var updatedData = {
                review_id: currentReview._id,
                review: review,
                user_id: currentReview.user_id,
                name: currentReview.name
            }

            MovieDataService.editReview(updatedData)
            .then(response => {
                navigate("/movies/"+params.id)
            })
            .catch(e => {
                console.log(e);
            });

        } else {
            MovieDataService.createReview(data)
            .then(response => {
                navigate("/movies/"+params.id)
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{ currentReview ? "Edit" : "Create" } Review</Form.Label>
                    <Form.Control 
                    as="textarea"
                    type="text" 
                    required
                    review={ review } 
                    onChange={ onChangeReview }
                    defaultValue={ currentReview ? currentReview.review : "" }
                    />
                </Form.Group>
                <Button variant="primary" onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview;

