import Header from './components/Header';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import VitaminD from './components/VitaminD';
import Products from './components/Products';
import WhyUs from './components/WhyUs';
import Branches from './components/Branches';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WhyUs />
      <Treatments />
      <VitaminD />
      <Products />
      <Branches />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;
