interface gqlParams {
    query: String;
    variables?: object;
}

export async function wpquery({ query, variables = {} }: gqlParams) {
    const res = await fetch('https://final-translations.com/wp/graphql', {
        method: "post",
        headers: {
            "Content-Type": "application/json",

        },

        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!res.ok) {
        console.error(res);
        return {};
    }

    const { data } = await res.json();
    return data;
}