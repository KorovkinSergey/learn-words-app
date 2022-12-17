import React, { useEffect, useState } from "react";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Folder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useDictionaryList } from "../../hooks/api/useDictionaryList";
import { useAuthContext } from "../../context/AuthContext";
import { Wrapper } from "../../components/Wrapper";
import { Title } from "../../components/Title";

const DictionaryPage = () => {
	const { token } = useAuthContext();
	const { getDictionaryList, loading } = useDictionaryList();
	const [dictionaryList, setDictionaryList] = useState([]);

	useEffect(() => {
		getDictionaryList().then(setDictionaryList);
	}, [getDictionaryList, token]);

	if (loading) return <Button onClick={() => {
		console.log("qwewe");
	}} />;

	if (loading) return <Loading />;

	return (
		<Wrapper>
			<Title title="Список словарей" />
			<List>
				{dictionaryList.map((item: any) => {
					return (
						<ListItem key={item._id} sx={{ "& > a": { textDecoration: "none" } }}>
							<ListItemAvatar>
								<Avatar>
									<Folder />
								</Avatar>
							</ListItemAvatar>
							<Link to={`/dictionary/${item._id}`}>
								<ListItemText
									sx={{ color: "white" }}
									primary={item.title}
								/>
							</Link>
						</ListItem>
					);
				})}
			</List>
		</Wrapper>
	);
};

export default DictionaryPage;
