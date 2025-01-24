import React from "react";
import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl ">
      <div className=" flex flex-col flex-auto justify-center">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          JavaScript is a versatile and popular programming language that can be
          used to build web applications. Explore its features, syntax, and best
          practices to make the most of your skills.
        </p>
        <Button gradientDuoTone="purpleToPink">
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 JavaScript Projects
          </a>
        </Button>
      </div>
      <div className="p-5 sm:max-h-60">
        <img
          className="sm:max-h-40"
          src="https://firebasestorage.googleapis.com/v0/b/mern-blog-a45bd.firebasestorage.app/o/1733575880347_javascript%20post.jpg?alt=media&token=62c0f583-bf6a-476d-8e7b-8b56437de4af"
        />
      </div>
    </div>
  );
}
