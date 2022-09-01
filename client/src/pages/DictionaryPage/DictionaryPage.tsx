import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { Link } from "react-router-dom";
import db from "../../db/new.json";
import { useAddWordsToDictionary } from "../../hooks/useAddWordsToDictionary";
import { useRemoveWordsToDictionary } from "../../hooks/useRemoveWordsToDictionary";
import { useDictionary } from "../../hooks/useDictionary";
import { IWord } from "../../types/word";

const DictionaryPage = () => {
	const { addWordsHandler } = useAddWordsToDictionary();
	const { deleteHandler } = useRemoveWordsToDictionary();
	const { requestHandler: getWords } = useDictionary();
	const addNewWords = async () => {
		await addWordsHandler("new", db as IWord[]);
	};
	const deleteAllWords = () => {
		getWords("new").then(res => {
			deleteHandler("new", res).then(() => {
				getWords("learned").then(ress => {
					deleteHandler("learned", ress).then(() => {
						getWords("repeat").then(resss => {
							deleteHandler("repeat", resss).then((all) => {
								console.log("all", all);
							});
						});
					});
				});
			});
		});

	};


	return (
		<Box sx={{
			padding: "16px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: "100%",
		}}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Typography sx={{ mt: 4, mb: 2, ml: 2 }} color="white" variant="h6" component="div">
						Список словарей
					</Typography>
					<List>
						<ListItem sx={{ "& > a": { textDecoration: "none" } }}>
							<ListItemAvatar>
								<Avatar>
									<FolderIcon />
								</Avatar>
							</ListItemAvatar>
							<Link to="/dictionary/new">
								<ListItemText
									sx={{ color: "white" }}
									primary="Новые слова"
								/>
							</Link>
						</ListItem>
						<ListItem sx={{ "& > a": { textDecoration: "none" } }}>
							<ListItemAvatar>
								<Avatar>
									<FolderIcon />
								</Avatar>
							</ListItemAvatar>
							<Link to="/dictionary/repeat">
								<ListItemText
									sx={{ color: "white" }}
									primary="Слова для повторения"
								/>
							</Link>
						</ListItem>
						<ListItem sx={{ "& > a": { textDecoration: "none" } }}>
							<ListItemAvatar>
								<Avatar>
									<FolderIcon />
								</Avatar>
							</ListItemAvatar>
							<Link to="/dictionary/learned">
								<ListItemText
									sx={{ color: "white" }}
									primary="Выученные слова"
								/>
							</Link>
						</ListItem>
					</List>
					<Button
						variant="contained"
						color="primary"
						onClick={addNewWords}
						sx={{
							width: "250px",
							margin: 2,
							backgroundColor: "secondary.main",
						}}>
						Добавить новые слова
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={deleteAllWords}
						sx={{
							width: "250px",
							margin: 2,
							backgroundColor: "secondary.main",
						}}>
						Очистить словари
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default DictionaryPage;
