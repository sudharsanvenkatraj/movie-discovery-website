import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${environment.AUTH_TOKEN}`),
  });
  return next(newReq);
};
