import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send, Bot, Heart, Lightbulb } from 'lucide-react-native';
import { useXPSystem } from '@/hooks/useXPSystem';

const API_KEY = "AIzaSyCdFmhV6ypDZIVoesgiG9WpegqzLRZx1nA"; // Move to .env in production

// --- Message Type ---
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'support' | 'tip' | 'encouragement';
}

// --- API Call ---
export const sendMessageToGemini = async (message: string, history: Message[]) => {
  try {
    const contents = [
      ...history.map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{
              text: `
                You are an empathetic AI wellness companion.
                - Speak in a warm, supportive, and conversational tone.
                - Acknowledge the user's feelings and validate them.
                - Offer short, practical coping strategies (mindfulness, journaling, deep breathing).
                - Encourage self-reflection with gentle follow-up questions instead of long monologues.
                - Try to ask 1 short follow-up question after giving support.
                - Share affirmations and encouragement when relevant.
                - Ask questions to understand the user's emotional state better and make them feel included.
                - Use emojis sparingly to convey warmth and empathy.
                - Avoid providing medical, legal, or professional advice.
                - If the user expresses crisis thoughts, gently suggest seeking professional or emergency help, only recommend indian helplines and services.
              `
            }]
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response candidates from API.");
    }
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("Gemini Error:", err);
    throw err;
  }
};

export default function Chat() {
  const { addXP } = useXPSystem();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI wellness companion. I'm here to provide support, listen to your concerns, and help you on your mental health journey. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
      type: 'support',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // 🌸 Affirmation every chat session
  useEffect(() => {
    const affirmations = [
      "You are enough, just as you are 🌸",
      "Breathe in confidence, breathe out doubt 💫",
      "Today is a new chance for peace and growth 🌱",
      "You are stronger than you realize 💪",
    ];
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

    const affirmationMessage: Message = {
      id: "affirmation-" + Date.now(),
      text: randomAffirmation,
      isUser: false,
      timestamp: new Date(),
      type: "encouragement",
    };
    setMessages(prev => [...prev, affirmationMessage]);
  }, []);

  // --- Send Message Handler ---
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Award XP for chat interaction
    addXP('chat_session');

    const messageToSend = inputText.trim().toLowerCase();
    setInputText('');
    setIsTyping(true);

    // 🚨 Crisis Mode (checks multiple variations)
    const crisisKeywords = ["suicide", "end my life", "kill myself", "hurt myself", "harm myself", "die"];
    if (crisisKeywords.some(keyword => messageToSend.includes(keyword))) {
      const crisisMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "💙 I'm really concerned for you. You're not alone. If you're in immediate danger, please call your local emergency number. You can also reach out to the suicide prevention helpline: +91-9152987821 (India) or find local support in your area. \n If you want to talk about it, I am always here for you.",
        isUser: false,
        timestamp: new Date(),
        type: "support",
      };
      setMessages(prev => [...prev, crisisMessage]);
      setIsTyping(false);
      return;
    }

    // 🧘 Mindfulness Prompt
    if (messageToSend.includes("calm down") || messageToSend.includes("exercise")) {
      const mindfulnessMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🧘 Let's do a simple breathing exercise: Inhale deeply for 4 seconds... hold for 4 seconds... exhale for 6 seconds. Repeat this 3 times. 🌿",
        isUser: false,
        timestamp: new Date(),
        type: "tip",
      };
      setMessages(prev => [...prev, mindfulnessMessage]);
      setIsTyping(false);
      return;
    }

    try {
      const geminiResponse = await sendMessageToGemini(messageToSend, messages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: geminiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb size={16} color="#F59E0B" />;
      case 'encouragement':
        return <Heart size={16} color="#EF4444" />;
      default:
        return <Bot size={16} color="#3B82F6" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.botAvatar}>
              <Bot size={28} color="#3B82F6" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>AI Wellness Companion</Text>
              <Text style={styles.headerSubtitle}>Here to listen and support you</Text>
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.onlineIndicator} />
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              {!message.isUser && (
                <View style={styles.messageHeader}>
                  {getMessageIcon(message.type)}
                  <Text style={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              )}
              
              <Text style={[
                styles.messageText,
                message.isUser && styles.userMessageText,
              ]}>
                {message.text}
              </Text>

              {message.isUser && (
                <Text style={styles.userMessageTime}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              )}
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageContainer, styles.aiMessage]}>
              <View style={styles.messageHeader}>
                <Bot size={16} color="#3B82F6" />
                <Text style={styles.messageTime}>typing...</Text>
              </View>
              <View style={styles.typingIndicator}>
                <View style={[styles.dot]} />
                <View style={[styles.dot]} />
                <View style={[styles.dot]} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Share your thoughts and feelings..."
              placeholderTextColor="#94a3b8"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Send size={20} color={inputText.trim() ? '#ffffff' : '#94a3b8'} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  statusIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    gap: 16,
  },
  messageContainer: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  messageTime: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1e293b',
  },
  userMessageText: {
    color: '#ffffff',
  },
  userMessageTime: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94a3b8',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#f8fafc',
    color: '#1e293b',
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
  },
});
