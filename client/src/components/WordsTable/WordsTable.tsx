import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import { useDictionary } from "../../hooks/useDictionary";
import { useWindowSizeContext } from "../../context/WindowSizeContext";
import { Loading } from "../Loading";
import { IWord } from "../../types/word";

const WordsTable = () => {
	const { requestHandler, loading } = useDictionary();
	const { height } = useWindowSizeContext();
	const params = useParams();
	const navigate = useNavigate();
	const { dictionary } = params;

	const [rows, setRows] = useState<IWord[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map(row => row._id as string);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	useEffect(() => {
		if (!dictionary) return navigate("/dictionary");
		setIsSelected(true);
		requestHandler(dictionary).then(setRows);
	}, [dictionary, navigate, requestHandler]);

	if (loading) return <Loading />;

	return (
		<Box sx={{
			width: "100%",
		}}>
			<Paper sx={{ overflow: "hidden" }}>
				<TableContainer sx={{ height: height - 56 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							{isSelected && <TableRow>
								<TableCell>Выбрано {selected.length} слов</TableCell>
								<TableCell>
									<button>удалить</button>
								</TableCell>
							</TableRow>}
							<TableRow>
								<TableCell align="center">
									<Checkbox indeterminate={true} onChange={handleSelectAllClick} />
								</TableCell>
								<TableCell align="center">Перевод</TableCell>
								<TableCell align="center">Слово</TableCell>
								<TableCell align="center">Транскрипция</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row: IWord) => (
								<TableRow key={row._id}>
									<TableCell align="center"><Checkbox /></TableCell>
									<TableCell align="center">{row.russianWord}</TableCell>
									<TableCell align="center">{row.englishWord}</TableCell>
									<TableCell align="center">{row.transcript}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	);
};

export default WordsTable;
