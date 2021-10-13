import React, { useState, useEffect } from 'react';
import './home.scss';
import Users from '../../interface/user';
import Interests from '../../interface/interests';
import { getAllUsers } from '../../service/users';
import { getAllInterests } from '../../service/interests';
import Modal from '../../modals/delete-user/delete-user';

const Home = () => {
	const [users, setUsers] = useState<Users[]>([]);
	const [userId, setUserId] = useState<number>();
	const [interests, setInterests] = useState<Interests[]>([]);
	const [isShowing, setIsShowing] = useState<boolean>(false);

	const reducer = (previousValue: number, currentValue: number) =>
		previousValue + currentValue;

	useEffect(() => {
		getUsers();
		getInterests();
	}, []);

	function getUsers() {
		getAllUsers()
			.then((res: any) => {
				setUsers(res);
				console.log(res);
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	}

	function getInterests() {
		getAllInterests()
			.then((res: any) => {
				setInterests(res);
				console.log(res);
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	}

	const openModalHandler = (id: number) => {
		setUserId(id)
		setIsShowing(true);
	};

	const closeModalHandler = () =>{
		setIsShowing(false);
	};

	const deleteUser = () => {
		setUsers(users.filter(item => item.id !== userId))
		closeModalHandler();
	}

 

	function getUserInterests(number:number) {
	return interests.map(item => item.id === number)
	}

	return (
		<section className='home'>
			<h1>users table</h1>
			<table className='table'>
				<thead>
					<tr>
						<th>#</th>
						<th>name</th>
						<th>interests</th>
						<th>following</th>
						<th>actions</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user: Users, index: number) => {
						return (
							<tr key={index}>
								<td data-column='id'>{index + 1}</td>
								<td data-column='name'>{user?.name}</td>
								<td data-column='interests'>{user.interests}</td>
								<td data-column='following'>
									{user?.following.reduce(reducer)}
								</td>
								<td>
									<button className='default-btn'>delete interests</button>
									<button
										className='default-btn'
										onClick={() => openModalHandler(user.id)}>
										delete user
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Modal className='modal' show={isShowing} close={closeModalHandler} deleteUser={deleteUser}>
				Are you sure delete user ?
			</Modal>
		</section>
	);
};

export default Home;
