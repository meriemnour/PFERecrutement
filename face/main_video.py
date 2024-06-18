import cv2
from simple_facerec import SimpleFacerec

# Dictionary containing face information
face_info = {
    "anne": [123, 'password1'],"Elon Musk": [456, 'password2'],  #
    # Add more entries for other faces if needed
}

# Encode faces from a folder
sfr = SimpleFacerec()
sfr.load_encoding_images("images/")

# Load Camera
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    # Detect Faces
    face_locations, face_names = sfr.detect_known_faces(frame)
    for face_loc, name in zip(face_locations, face_names):
        y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

        
        # Display the name above the detected face
        cv2.putText(frame, name,(x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
        # Draw rectangle around the detected face
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)

        # Print out "Hello" and the name of the person detected
        print("Hello", name)

        # Check if the detected face is in the face_info dictionary
        if name in face_info:
            number, pswd = face_info[name]
            print("ID:", number, "PASSWORD:", pswd)

    cv2.imshow("Frame", frame)

    # Check for ESC key press to exit the loop
    key = cv2.waitKey(1)
    if key == 27:
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
