import { useState, createContext, useContext, useMemo } from "react";
import { faker } from "@faker-js/faker";

const PostContext = createContext();

function PostProvider({ children }) {
    function createRandomPost() {
        return {
            title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
            body: faker.hacker.phrase(),
        };
    }

    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");

    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    const value = useMemo(() => {
        return {
            posts: searchedPosts,
            onAddPost: handleAddPost,
            onClearPosts: handleClearPosts,
            searchQuery,
            setSearchQuery,
            createRandomPost,
        };
    }, [searchedPosts, searchQuery]);

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
}

function usePostContext() {
    return useContext(PostContext);
}

export { PostProvider, usePostContext }