# ChromaClimb

## Inspiration
Rock Climbing Gyms often colour-code their climbs. At a glance, it may seem simple and effective, letting patrons differentiate the problems and easily know which holds are off or on for a given climb. However, this leaves those with colorblindness second-guessing, unsure of where the problem starts, ends, or anywhere in between.

## What it does
After taking a picture of the wall with their phone, ChromaClimb organizes the climbs by colour, highlighting individual problems that the user can swipe through to find whichever problem they are unclear on.

## How we built it
Using yolov8 (a pre-trained model), we fed the AI photos of rock climbing walls which were manually annotated, making a weighted dataset. Using React Native, we created a mobile app that focused on simplicity and intuitive ease of use.

## Challenges we ran into
For earlier versions of the model, similar colours such as orange and yellow were mixed up, and volumes
would sometimes not be recognized as a hold.

## Accomplishments that we're proud of
- Training/making our first model


## What we learned
- React Native
- Yolov8
- Roboflow
- Expo
- React Native

## What's next for ChromaClimb
By collaborating with local climbing gyms, and having those gyms setters give us their beta as they set up new problems, ChromaClimb could go beyond object recognition, and start giving beta to any climber with a simple picture.
