import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  Heading,
} from '@chakra-ui/react';

function Login() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Card p={8} rounded="md" shadow="md" maxW='md'>
        <Heading mb={4} size="lg" textAlign="center">
          Sign in to Workflows
        </Heading>
        <form>
          <FormControl id="email" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" />
          </FormControl>
          <Button colorScheme="blue" type="submit" width='100%'>
            Sign in
          </Button>
        </form>
      </Card>
    </Flex>
  );
}

export default Login;
