// // MyComponent.js

// import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// import { View, Text, Image } from 'react-native';

// const MyComponent = () => {
//   // State to store fetched data
//   const [postData, setPostData] = useState(null);

//   // useEffect to make API call when component mounts
//   useEffect(() => {
//     // Function to fetch data
//     const fetchData = async () => {
//       try {
//         // API call using Axios
//         const response = await axios.get(
//           'https://graph.facebook.com/v12.0/me?fields=id,name,posts{full_picture,name,object_id,parent_id},feed&access_token=EAAK7BoOU7uUBO1GGge77KPHeFna8Ce21hJSaIZAvB4EWaKLCINpwR4rtIu4bbowNJxuHhZA2leBUYSkHsnZBoBwD5CNeqVMW2tNY2jUZBADEJUxnYgH54oBj7I0pmAZB4h0k6UMRc5xaZBWU48ENkZAhx95lCI5S68cdELZANLQpz4J9eDu4EDH390teiXRhWdil'
//         );

//         // Update state with the fetched data
//         setPostData(response.data);
//       } catch (error) {
//         // Handle errors
//         console.error('Error fetching data:', error);
//       }
//     };

//     // Call the fetchData function
//     fetchData();
//   }, []); // Empty dependency array ensures the effect runs once when the component mounts

//   // If data is still being fetched, show a loading message
//   if (!postData) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View>
//       <Text>User ID: {postData.id}</Text>
//       <Text>User Name: {postData.name}</Text>
//       <Text>Posts:</Text>
//       {postData.posts &&
//         postData.posts.data.map((post) => (
//           <View key={post.id}>
//             <Text>Post Name: {post.name}</Text>
//             <Text>Object ID: {post.object_id}</Text>
//             <Text>Parent ID: {post.parent_id}</Text>
//             {post.full_picture && <Image source={{ uri: post.full_picture }} style={{ width: 200, height: 200 }} />}
//           </View>
//         ))}
      
//       <Text>Feed:</Text>
//       {postData.feed &&
//         postData.feed.data.map((feedItem) => (
//           <View key={feedItem.id}>
//             <Text>Feed Message: {feedItem.message}</Text>
//             <Text>Created Time: {feedItem.created_time}</Text>
//           </View>
//         ))}
//     </View>
//   );
// };

// export default MyComponent;

// MyComponent.js

import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { View, Text, Image, StyleSheet } from 'react-native';

const MyComponent = () => {
  // State to store fetched data
  const [postData, setPostData] = useState(null);

  // useEffect to make API call when component mounts
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // API call using Axios
        const response = await axios.get(
          'https://graph.facebook.com/v12.0/me?fields=id,name,posts{full_picture,name,object_id,parent_id},feed&access_token=EAAK7BoOU7uUBO1GGge77KPHeFna8Ce21hJSaIZAvB4EWaKLCINpwR4rtIu4bbowNJxuHhZA2leBUYSkHsnZBoBwD5CNeqVMW2tNY2jUZBADEJUxnYgH54oBj7I0pmAZB4h0k6UMRc5xaZBWU48ENkZAhx95lCI5S68cdELZANLQpz4J9eDu4EDH390teiXRhWdil'
        );

        // Update state with the fetched data
        setPostData(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // If data is still being fetched, show a loading message
  if (!postData) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>User ID: {postData.id}</Text>
      <Text style={styles.userInfo}>User Name: {postData.name}</Text>
      <Text style={styles.sectionTitle}>Posts:</Text>
      {postData.posts &&
        postData.posts.data.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.postText}>Post Name: {post.name}</Text>
            <Text style={styles.postText}>Object ID: {post.object_id}</Text>
            <Text style={styles.postText}>Parent ID: {post.parent_id}</Text>
            {post.full_picture && (
              <Image source={{ uri: post.full_picture }} style={styles.postImage} />
            )}
          </View>
        ))}

      <Text style={styles.sectionTitle}>Feed:</Text>
      {postData.feed &&
        postData.feed.data.map((feedItem) => (
          <View key={feedItem.id} style={styles.feedContainer}>
            <Text style={styles.feedText}>Feed Message: {feedItem.message}</Text>
            <Text style={styles.feedText}>Created Time: {feedItem.created_time}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  postText: {
    fontSize: 14,
    marginBottom: 5,
  },
  postImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  feedContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  feedText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default MyComponent;
