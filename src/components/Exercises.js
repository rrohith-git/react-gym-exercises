import React, { useEffect, useState } from 'react';
import { Pagination, Box, Typography, Stack } from '@mui/material';

import { exercisesOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, bodyPart, setExercises }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const exercisePerPage = 9;
    const indexOfLastExercise = currentPage * exercisePerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 1800, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchExercisesData = async () => {
            let exerciseData = [];
            if (bodyPart === 'all') {
                exerciseData = await fetchData(process.env.REACT_APP_RAPID_API_EXERCISE_URL, exercisesOptions);
            } else {
                exerciseData = await fetchData(process.env.REACT_APP_RAPID_API_EXERCISE_URL + `/bodyPart/${bodyPart}`, exercisesOptions);
            }
            setExercises(exerciseData);
        };
        fetchExercisesData();
    }, [bodyPart, setExercises]);

    if (!currentExercises.length) return <Loader />;

    return (
        <Box id="exercises"
            sx={{ mt: { lg: '110px' } }}
            mt="50px"
            p="20px"
        >
            <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
                Showing Results
            </Typography>
            <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
                {currentExercises.map((exercise, index) => (<ExerciseCard key={index} exercise={exercise} />))}
            </Stack>
            <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
                {exercises.length > exercisePerPage &&
                    <Pagination
                        color='standard'
                        shape='rounded'
                        defaultPage={1}
                        count={Math.ceil(exercises.length / exercisePerPage)}
                        page={currentPage}
                        onChange={paginate}
                        size="large"
                    />}
            </Stack>
        </Box>
    )
};

export default Exercises;