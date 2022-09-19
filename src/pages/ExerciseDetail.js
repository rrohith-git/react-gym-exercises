import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exercisesOptions, fetchData, youtubeSearchOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExecises';

const ExerciseDetail = () => {

    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);
    const { id: exerciseId } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchExercisesDetail = async () => {
            if (exerciseId) {
                const exerciseDetailData = await fetchData(process.env.REACT_APP_RAPID_API_EXERCISE_URL + `/exercise/${exerciseId}`, exercisesOptions);
                setExerciseDetail(exerciseDetailData);
                const exerciseVideosData = await fetchData(process.env.REACT_APP_RAPID_API_YOUTUBE_SEARCH_URL + `/search?query=${exerciseDetailData.name}`, youtubeSearchOptions);
                setExerciseVideos(exerciseVideosData.contents);
                const targetMuscleExercisesData = await fetchData(process.env.REACT_APP_RAPID_API_EXERCISE_URL + `/target/${exerciseDetailData.target}`, exercisesOptions);
                setTargetMuscleExercises(targetMuscleExercisesData);
                const equipmentExercisesData = await fetchData(process.env.REACT_APP_RAPID_API_EXERCISE_URL + `/equipment/${exerciseDetailData.equipment}`, exercisesOptions);
                setEquipmentExercises(equipmentExercisesData);
            }
        };
        fetchExercisesDetail();
    }, [setExerciseDetail, exerciseId])

    if (!exerciseDetail) return <div>No Data</div>;

    return (
        <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
            <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
        </Box>
    )
};

export default ExerciseDetail;