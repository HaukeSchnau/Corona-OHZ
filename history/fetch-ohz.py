import requests
import os.path
import json
from datetime import datetime

history_file_name = "history.json"

history = {}
if os.path.isfile(history_file_name):
  with open(history_file_name) as f:
    history = json.load(f)

res = requests.get("https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=county%3D%27LK+Osterholz%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=cases7_per_100k&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=")
inzidenz = res.json()["features"][0]["attributes"]["cases7_per_100k"]
date = datetime.today().strftime('%Y-%m-%d')

history[date] = inzidenz

with open(history_file_name, "w") as f:
  json.dump(history, f, indent=2)