import { useEffect, useState } from "react";
import MovieCard from "../components/cards/MovieCard";
import Loading from "../components/loaders/Loading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { currentday, prevmonthday, nextyearday } from "../atom/Date";

function MovieMenu() {
	const { menu } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [totalPages, setTotalPages] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

	const getMovies = async () => {
		if (menu === "now_playing") {
			await axios
				.get(
					`${BASE_PATH}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${prevmonthday}&primary_release_date.lte=${currentday}&page=${currentPage}`,
				)
				.then((res) => {
					setMovies(res.data.results);
					if (res.data.total_pages < 500) {
						setTotalPages(res.data.total_pages);
					} else {
						setTotalPages(500);
					}
				});
		} else if (menu === "top_rated") {
			await axios
				.get(
					`${BASE_PATH}/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=150&page=${currentPage}`,
				)
				.then((res) => {
					setMovies(res.data.results);
					if (res.data.total_pages < 500) {
						setTotalPages(res.data.total_pages);
					} else {
						setTotalPages(500);
					}
				});
		} else if (menu === "popular") {
			await axios
				.get(
					`${BASE_PATH}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${currentPage}`,
				)
				.then((res) => {
					setMovies(res.data.results);
					if (res.data.total_pages < 500) {
						setTotalPages(res.data.total_pages);
					} else {
						setTotalPages(500);
					}
				});
		} else if (menu === "upcoming") {
			await axios
				.get(
					`${BASE_PATH}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${currentday}&primary_release_date.lte=${nextyearday}&page=${currentPage}`,
				)
				.then((res) => {
					setMovies(res.data.results);
					if (res.data.total_pages < 500) {
						setTotalPages(res.data.total_pages);
					} else {
						setTotalPages(500);
					}
				});
		}
		setLoading(false);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [menu]);

	useEffect(() => {
		if (
			menu !== "now_playing" &&
			menu !== "top_rated" &&
			menu !== "popular" &&
			menu !== "upcoming"
		) {
			navigate("/404", { replace: true });
		} else {
			getMovies();
			window.scrollTo(0, 0);
		}
	}, [currentPage, menu, navigate]);

	return (
		<Container>
			{loading ? (
				<Loading />
			) : (
				<Movies>
					{movies.map((movie) => (
						<MovieCard
							key={movie.id}
							movieId={movie.id}
							title={movie.title}
							poster_path={`${IMAGE_BASE_URL}original${movie.poster_path}`}
							year={movie.release_date}
							vote_average={movie.vote_average}
						/>
					))}
				</Movies>
			)}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
				setmaxPageNumberLimit={setmaxPageNumberLimit}
				maxPageNumberLimit={maxPageNumberLimit}
				setminPageNumberLimit={setminPageNumberLimit}
				minPageNumberLimit={minPageNumberLimit}
			/>
		</Container>
	);
}

export default MovieMenu;

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	transition: all 0.1s ease;
`;

const Movies = styled.div`
	display: grid;
	place-items: center;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 5px;
	width: 90%;
	margin-top: 120px;

	@media ${({ theme }) => theme.device.desktop} {
		width: 60%;
	}

	@media screen and (max-width: 1220px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media screen and (max-width: 950px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media screen and (max-width: 730px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 480px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;
