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
        
        <div className="max-w-md mx-auto overflow-hidden">
          <MaggieChatbot />
        </div>
        
        <div className="mt-6 text-center max-w-lg mx-auto">
          <p className="text-sm text-gray-600 font-medium mb-2">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 bg-indigo-50 rounded-full text-xs text-indigo-700">"Tell me about yourself"</span>
            <span className="inline-block px-3 py-1 bg-indigo-50 rounded-full text-xs text-indigo-700">"Share a poem"</span>
            <span className="inline-block px-3 py-1 bg-indigo-50 rounded-full text-xs text-indigo-700">"Tell me a story"</span>
            <span className="inline-block px-3 py-1 bg-indigo-50 rounded-full text-xs text-indigo-700">"What's your favorite toy?"</span>
          </div>
          <p className="text-xs text-gray-500">
            Note: Maggie is a simple chatbot who loves to talk about herself, share poems, and tell stories. 
            She's still learning, so please be patient with her!
          </p>
        </div>
      </div>
    </section>
  );
};

export default MaggieChatbotSection;