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
          Have a conversation with Maggie! Ask her questions about her life, request a poem, or hear a short story about her adventures as a storytelling dog.
        </p>
        
        <div className="max-w-md mx-auto shadow-xl rounded-lg overflow-hidden">
          <MaggieChatbot />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 font-medium mb-3">Try asking Maggie:</p>
          <p className="text-sm text-gray-500 max-w-lg mx-auto grid gap-2">
            <span className="inline-block px-3 py-1 bg-purple-50 rounded-full italic">"Tell me about yourself, Maggie"</span>
            <span className="inline-block px-3 py-1 bg-purple-50 rounded-full italic">"Can you share a poem about dogs?"</span>
            <span className="inline-block px-3 py-1 bg-purple-50 rounded-full italic">"Tell me a story about your adventures"</span>
            <span className="inline-block px-3 py-1 bg-purple-50 rounded-full italic">"What's your favorite food?"</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MaggieChatbotSection;