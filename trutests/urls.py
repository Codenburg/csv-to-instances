from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from trutests import views

router = routers.DefaultRouter()
router.register(r"trutests", views.TrutestView, basename="trutests")
router.register(r"file", views.CSVFileView, basename="upload-csv")
router.register(r"animal",views.CreateAnimalView,basename="animal")
urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Trutests API')),
]
