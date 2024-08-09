import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  loggerLink,
  wsLink,
} from "@trpc/client";
import "./style.css";
import { AppRouter } from "../../server/src/server.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <p>typescript vanilla project</p>
  </div>
`;
document.addEventListener("click", () => {
  client.users.update.mutate({ userId: "1", name: "alex" });
});

const wsClient = createWSClient({
  url: "ws://localhost:8080/trpc",
});

const client = createTRPCProxyClient<AppRouter>({
  links: [
    //loggerLink(), //nice for viewing req and res in browser console
    //httpBatchLink must be last in links[] !
    //can use httpLink, same without batching of requests
    //splitLink to use both ws and http based on condition
    splitLink({
      condition: (operation) => {
        return operation.type === "subscription";
      },
      true: wsLink({
        //client: wsClient, or like below
        client: createWSClient({
          url: "ws://localhost:8080/trpc",
        }),
      }),
      false: httpBatchLink({
        url: "http://localhost:8080/trpc",
      }),
    }),
    /*
    wsLink({
      client: createWSClient({
        url: "ws://localhost:8080/trpc",
      }),
    }),
    httpBatchLink({
      url: "http://localhost:8080/trpc",
      // example header
      headers: { Authorization: "AUTH_TOKEN" },
    }),
    */
  ],
});

const main = async () => {
  const result = await client.sayHi.query();
  console.log(result);

  const result2 = await client.logToServer.mutate("mutation input");
  console.log(result2);

  const result3 = await client.users.get.query({ userId: "1337" });
  //const result3 = await client.getUser.query()
  console.log(result3);

  const result4 = await client.users.update.mutate({
    userId: "1338",
    name: "kittenson",
  });
  console.log(result4);

  const result5 = await client.secretData.query();
  console.log(result5);

  //ws, emit.next on server will call onData here
  const connection = client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log(`updated ${id}`);
    },
  });
  //connection.unsubscribe (stop listening on client)
  //wsClient.close() (if we created WsClient with variable)
};
main();
