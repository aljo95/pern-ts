import { trpc } from "./trpc";

/*
interface GreetingResponse {
  id: string;
  name: string;
}
*/
type PostgresUsersQuery = {
  name: string;
  age: number;
  id: number;
};
export function Greeting() {
  //const greeting: GreetingResponse[] = trpc.user.getUsers.useQuery(); //add some options for refetch etc
  const greeting: PostgresUsersQuery[] = trpc.user.getUsers.useQuery();
  if (greeting.data === undefined) return <></>;

  console.log("trpc data: " + greeting.data[1]);

  return (
    <div id="greetings-container">
      <p>All users: </p>
      <div id="all-container">
        {greeting.data.map((e) => {
          return (
            <div key={e.id}>
              <h4>{e.name}</h4>
              <h5>{e.age}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
