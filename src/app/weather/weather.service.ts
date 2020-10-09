import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ICurrentWeather } from '../interfaces';
import { Observable } from 'rxjs';

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];

  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: no-shadowed-variable
  getCurrentWeather(
    city: string,
    country: string
  ): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('q', `${city}, ${country}`)
      .set('appid', environment.appId);

    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
      { params: uriParams }
    );
  }
}
