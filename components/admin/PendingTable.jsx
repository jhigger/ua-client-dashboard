import {RepeatIcon} from '@chakra-ui/icons';
import {
	Button,
	Flex,
	Heading,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	useToast,
	IconButton
} from '@chakra-ui/react';

const PendingTable = ({pending, handleRefresh}) => {
	const toast = useToast();

	const handleApprove = (address) => {
		handleUpdate(address, 2);
	};

	const handleReject = (address) => {
		handleUpdate(address, 3);
	};

	const handleUpdate = (address, statusId) => {
		const showToast = () => {
			return toast({
				title: statusId === 2 ? 'Approved' : 'Rejected',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`http://localhost:3000/api/submissions/${address}`, {
			method: 'PUT',
			body: JSON.stringify({statusId}),
			headers: {'Content-type': 'application/json; charset=UTF-8'}
		})
			.then(() => {
				showToast();
				handleRefresh();
			})
			.catch((err) => console.log(err));
	};

	return (
		<Stack
			p={8}
			shadow="md"
			bg={useColorModeValue('gray.50', 'gray.900')}
			borderWidth="1px"
			borderRadius="lg"
			spacing={4}
		>
			<Heading as="h2" size="md" alignSelf="center">
				Pending Submissions
			</Heading>
			<Flex justify="end">
				<IconButton
					aria-label="Refresh"
					icon={<RepeatIcon />}
					onClick={handleRefresh}
				/>
			</Flex>
			<TableContainer w="full" h="full" overflowY>
				<Table variant="striped" colorScheme="gray">
					<Thead>
						<Tr>
							<Th>Community Name</Th>
							<Th>Submitted By</Th>
							<Th textAlign="center">Options</Th>
						</Tr>
					</Thead>
					<Tbody>
						{pending.map((row) => {
							return (
								<Tr key={row.address}>
									<Td>{row?.communityName}</Td>
									<Td>{row?.discordId}</Td>
									<Td>
										<Stack direction="row" justify="center">
											<Button
												colorScheme="green"
												onClick={() =>
													handleApprove(row.address)
												}
											>
												Approve
											</Button>
											<Button
												colorScheme="red"
												onClick={() =>
													handleReject(row.address)
												}
											>
												Reject
											</Button>
										</Stack>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default PendingTable;