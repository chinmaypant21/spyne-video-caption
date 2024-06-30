### Live Deployment: https://spynevideosub.netlify.app

## Technical Decisions
I decided to use React with Typescript for this project. The reason to choose react was its component-based architecture, which allows for reusable UI components and efficient state management. Rather than building a custom caption component, I tried to utilize the **HTML `track`** for this purpose which seamlessly works with the **`video`** element.

I created a function that convert the generated captions to **VTT** format and passes them to **`track`** via a **Blob URL**.  This approach ensures that the user can see their changes in **real-time** without any performance issues or unnecessary **reloads**, enhancing the overall user experience and efficiency of the application. Here is the implementation:

```js
const blob = new Blob([captionData], { type: 'text/vtt' });
const blobUrl = URL.createObjectURL(blob);
trackRef.current.src = blobUrl;
```


## Preview

#### Adding subtitles:
![image](https://github.com/chinmaypant21/spyne-video-caption/assets/64401853/4d116819-1ead-4915-828e-4e0645f77f8e)

#### After clicking on **"Update Captions"** it instantly reflects the new subtitles:
![image](https://github.com/chinmaypant21/spyne-video-caption/assets/64401853/0c9dec38-278b-4611-bc54-8f790bef6d8b)

#### Error handling:
![image](https://github.com/chinmaypant21/spyne-video-caption/assets/64401853/dbde008b-87e3-4c32-9d7d-4ed3e01d9501)
![image](https://github.com/chinmaypant21/spyne-video-caption/assets/64401853/af9e02c6-018f-4035-9abe-7466f5eded55)


## Future Enhancements
**1. Advanced Caption Editing:**
- Implement more advanced features like **drag-and-drop** for timestamp adjustments and **multi-language support** for captions.

**2. Offline Support**:
- Enhance the **PWA** setup to fully support offline capabilities, allowing users to work on their captions even without an internet connection.

**3. Performance Optimization**:
- Optimize performance further by **lazy loading** components and using **memoization techniques** where applicable.

**4. Accessibility Improvements**:
- Conduct thorough accessibility testing and implement features like keyboard navigation and screen reader support to ensure the app is accessible to all users.

**5. Tacking More Edge Cases**:
- Handle more edge cases for URL validations and subtitle timestamp validations.
