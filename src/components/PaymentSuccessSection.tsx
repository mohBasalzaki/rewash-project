
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { apiService } from '../services/api';

interface Product {
  id: number;
  status: string;
  quantity: string;
  name: string;
  description: string;
  price: string;
  promo_price: string;
  currency: string;
  thumbnail: string;
  product_link: string;
  created_at: string;
  updated_at: string;
}

const PaymentSuccessSection = () => {
  const { t } = useLanguage();
  const { setCurrentSection, clearAppointmentData } = useAppState();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [transactionData, setTransactionData] = useState({
    date: '14/04/2025',
    time: '01:04',
    totalAmount: 145,
    additionalServices: 16
  });

  useEffect(() => {
    // جلب المنتجات الأكثر طلباً
    fetchPopularProducts();
    
    // جلب تفاصيل المعاملة
    fetchTransactionDetails();
    
    // مسح بيانات النموذج بعد نجاح الدفع
    clearAppointmentData();
    
    // لا نحتاج لإضافة حجز جديد هنا لأن createAppointment يقوم بذلك
    console.log('Payment success - reservation should be in localStorage');
  }, [clearAppointmentData]);

  const fetchTransactionDetails = async () => {
    try {
      // يمكن جلب transaction ID من URL params أو context
      const transactionId = 'TXN-2024-001'; // مثال
      const response = await apiService.getTransactionDetails(transactionId);
      if (response.status) {
        setTransactionData({
          date: response.data.date,
          time: response.data.time,
          totalAmount: response.data.totalAmount,
          additionalServices: response.data.additionalServices
        });
      }
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      // البيانات الافتراضية ستظل كما هي
    }
  };

  const fetchPopularProducts = async () => {
    setLoading(true);
    try {
      const response = await apiService.getPopularProducts();
      if (response.status) {
        setProducts(response.data);
      } else {
        // في حالة فشل API، نستخدم البيانات الوهمية
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // في حالة الخطأ، نستخدم بيانات افتراضية
      const fallbackProducts: Product[] = [];

      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMoreProducts = () => {
    // يمكن توجيه المستخدم إلى صفحة المتجر
    setCurrentSection('project-reservations');
  };

  const handleTrackReservation = () => {
    setCurrentSection('my-reservations');
  };

  const handleBackToHome = () => {
    setCurrentSection('project-reservations');
  };

  return (
    <section id="payment-success-section" className="m-0">
      <div className="card-body">
        {/* Success Confirmation Section */}
        <div className="text-center mb-5">
          {/* Success Icon */}
          <div className="success-icon-wrapper mb-4">
            <div className="success-icon d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white mb-3">
              <i className="ti ti-check fs-1"></i>
            </div>
          </div>
          
          {/* Success Message */}
          <h1 className="fs-3 fw-bold text-success mb-3">تم الدفع بنجاح !</h1>
          <p className="text-body-secondary fs-6 mb-0">
            شكرا لك! تم إتمام عملية الدفع بنجاح. سنبدأ في تجهيز طلبك فورا. تابع حالة الحجز أو تسوق الآن من متجر ريواش للحصول على أفضل المنتجات للعناية بسيارتك.
          </p>
        </div>

        {/* Transaction Details Section */}
        <div className="row g-3 mb-5">
          <div className="col-6">
            <div className="card transaction-card rounded-3 p-3 text-center">
              <div className="fw-bold fs-5 mb-1">{transactionData.date}</div>
              <div className="text-body-secondary small">التاريخ</div>
            </div>
          </div>
          <div className="col-6">
            <div className="card transaction-card rounded-3 p-3 text-center">
              <div className="fw-bold fs-5 mb-1">{transactionData.time}</div>
              <div className="text-body-secondary small">التوقيت</div>
            </div>
          </div>
          <div className="col-6">
            <div className="card transaction-card rounded-3 p-3 text-center">
              <div className="fw-bold fs-5 mb-1">
                {transactionData.totalAmount}
                <img width="15" alt="SAR" className="ms-1" src="../image/Saudi_Riyal_Symbol.svg"></img>
              </div>
              <div className="text-body-secondary small">المجموع الكلي</div>
            </div>
          </div>
          <div className="col-6">
            <div className="card transaction-card rounded-3 p-3 text-center">
              <div className="fw-bold fs-5 mb-1">
                {transactionData.additionalServices}
                <img width="15" alt="SAR" className="ms-1" src="../image/Saudi_Riyal_Symbol.svg"></img>
              </div>
              <div className="text-body-secondary small">الخدمات الاضافية</div>
            </div>
          </div>
        </div>

        {/* المنتجات الأكثر طلباً */}
        <div className="mt-4">
          <h5 className="fw-bold mb-3">{t('popularProducts')}</h5>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="row g-3">
              {products.map((product) => (
                <div key={product.id} className="col-md-4">
                  <div className="card product-card h-100">
                    <img src={product.thumbnail} alt={product.name} className="card-img-top" style={{height: '180px', objectFit: 'cover'}} />
                    <div className="card-body">
                      <h6 className="fw-bold mb-2">{product.name}</h6>
                      <p className="text-body-secondary small mb-2">{product.description}</p>
                      <div className="d-flex align-items-center mb-2">
                        <span className="fw-bold me-2">{product.promo_price} {product.currency}</span>
                        {product.promo_price && product.promo_price < product.price && (
                          <span className="text-body-tertiary text-decoration-line-through ms-2">
                            {product.price} {product.currency}
                          </span>
                        )}
                      </div>
                      <a href={product.product_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary w-100">
                        {t('viewProduct')}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center my-4">
              <i className="ti ti-info-circle me-2"></i>
              لا توجد منتجات متاحة حالياً.
            </div>
          )}
        </div>

        {/* Action Buttons */}
         <div className="text-center">
           <div className="d-grid gap-3">
             <button 
               className="btn btn-primary w-100"
               onClick={handleTrackReservation}
             >
               تابع حالة الحجز
             </button>
             <button 
               className="btn btn-outline-primary w-100"
               onClick={handleViewMoreProducts}
             >
               العودة الى الصفحة الرئيسية
             </button>
           </div>
         </div>
      </div>
    </section>
  );
};

export default PaymentSuccessSection;
