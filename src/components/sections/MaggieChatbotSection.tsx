import React from "react";
import MaggieChatbot from "@/components/maggie/MaggieChatbot";

const MaggieChatbotSection = () => {
  return (
    <section id="chat-with-maggie" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800 font-['Comic_Neue']">
          Chat with Maggie
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Have a conversation with Maggie! Ask her questions, request a poem, or hear a short story about her adventures.
        </p>
        
        <div className="max-w-md mx-auto">
          <MaggieChatbot />
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Note: Maggie is a simple chatbot who loves to talk about herself, share poems, and tell stories. 
            She's still learning, so please be patient with her!
          </p>
        </div>
      </div>
    </section>
  );
};

export default MaggieChatbotSection;