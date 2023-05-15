from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from trutests import views

router = routers.DefaultRouter()
router.register(r"trutests", views.TrutestListView, "trutests")
router.register(r"file", views.CSVFileView, "upload-csv")
router.register(r"animal", views.AnimalViewSet, "aniaml-set")
urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Trutests API')),
]

