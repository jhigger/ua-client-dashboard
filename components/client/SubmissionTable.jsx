import {
	CheckIcon,
	ExternalLinkIcon,
	RepeatIcon,
	SmallCloseIcon,
	TimeIcon
} from '@chakra-ui/icons';
import {
	Center,
	Flex,
	Heading,
	IconButton,
	Link,
	Spinner,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tag,
	TagLabel,
	TagLeftIcon,
	Tbody,
	Td,
	Text,
	Th,
	Tr,
	useColorModeValue
} from '@chakra-ui/react';

const Pill = ({ status }) => {
	const variant = {
		Pending: { colorScheme: 'yellow', icon: TimeIcon },
		Approved: { colorScheme: 'green', icon: CheckIcon },
		Rejected: { colorScheme: 'red', icon: SmallCloseIcon }
	};

	return (
		<Tag
			size="lg"
			colorScheme={variant[status]?.colorScheme}
			borderRadius="full"
		>
			<TagLeftIcon boxSize={4} as={variant[status]?.icon} />
			<TagLabel>{status}</TagLabel>
		</Tag>
	);
};

const VerticalTable = ({ submission }) => {
	return (
		<TableContainer w="full" h="full" overflowY>
			<Table>
				<Tbody>
					<Tr>
						<Th>Status</Th>
						<Td>
							<Pill status={submission?.status?.name} />
						</Td>
					</Tr>
					<Tr>
						<Th>Your Discord ID</Th>
						<Td>{submission?.discordId}</Td>
					</Tr>
					<Tr>
						<Th>Community Name</Th>
						<Td>{submission?.communityName}</Td>
					</Tr>
					<Tr>
						<Th>Discord Server URL</Th>
						<Td>
							<Link
								href={`//${submission?.discordServerUrl}`}
								isExternal
							>
								{submission?.discordServerUrl}
							</Link>
						</Td>
					</Tr>
					<Tr>
						<Th>Twitter URL</Th>
						<Td>
							<Link
								href={`//${submission?.twitterUrl}`}
								isExternal
							>
								{submission?.twitterUrl}
							</Link>
						</Td>
					</Tr>
					<Tr>
						<Th>Services</Th>
						<Td>{submission?.service}</Td>
					</Tr>
				</Tbody>
				<TableCaption>
					{submission?.link && (
						<>
							<Text as="span" pr={2} color="GrayText">
								Bot Link:
							</Text>
							<Link href={`//${submission?.link}`} isExternal>
								{submission?.link} <ExternalLinkIcon mx="2px" />
							</Link>
						</>
					)}
				</TableCaption>
			</Table>
		</TableContainer>
	);
};

const SubmissionTable = ({ submission, isLoading, refresh }) => {
	return (
		<Stack
			p={8}
			shadow="md"
			bg={useColorModeValue('gray.50', 'gray.900')}
			borderWidth="1px"
			borderRadius="lg"
			spacing={4}
		>
			<Heading as="h2" size="md" align="center">
				Your Submission
			</Heading>
			<Flex justify="end">
				<IconButton
					aria-label="Refresh"
					icon={<RepeatIcon />}
					onClick={refresh}
				/>
			</Flex>
			{isLoading ? (
				<Center>
					<Spinner alignSelf="center" />
				</Center>
			) : (
				<VerticalTable submission={submission} />
			)}
		</Stack>
	);
};

export default SubmissionTable;
